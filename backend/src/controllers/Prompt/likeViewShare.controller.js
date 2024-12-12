import { gptInteraction } from '../../models/gptInteraction.model.js';
import { GPT } from '../../models/Prompt/gptPrompt.model.js';
import { dalleInteraction } from '../../models/dalleInteraction.model.js';
import { DallE } from '../../models/Prompt/dallePrompt.model.js';
import { midjourneyInteraction } from '../../models/midjourneyInteraction.model.js';
import { Midjourney } from '../../models/Prompt/midjourneyPrompt.model.js';

let interaction, Model
const typeSwitch = (type) => {
    if (type === "gpt") {
        interaction = gptInteraction
        Model = GPT
    }
    else if (type === "dall-e") {
        interaction = dalleInteraction
        Model = DallE
    }
    else if (type === "midjourney") {
        interaction = midjourneyInteraction
        Model = Midjourney
    }
}

// add View
export const viewFunction = async (req, res) => {
    const { userId, id, type } = req.query;
    typeSwitch(type)
    try {
        const Interaction = await interaction.findOne({ userId, id });

        // if (!Interaction) {
        //     await interaction.create({ userId, id, viewed: true });
        //     await Model.findByIdAndUpdate(id, { $inc: { views: 1 } });
        // } else if (!Interaction.viewed) {
        //     Interaction.viewed = true;
        //     await Interaction.save();
        //     await Model.findByIdAndUpdate(id, { $inc: { views: 1 } });
        // }

        if (!Interaction) {
            // If the user has not shared this item before, create a new interaction log
            await interaction.create({ userId, id, viewed: true });
        } else {
            // If the user has shared this item before, update the existing log (increment share count)
            Interaction.viewed = true;  // Mark it as shared (if not already)
            await Interaction.save();
        }
        await Model.findByIdAndUpdate(id, { $inc: { views: 1 } });

        res.status(200).json({ message: 'View count updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add like
export const likeFunction = async (req, res) => {
    const { userId, id, type } = req.query;
    typeSwitch(type)
    try {
        const Interaction = await interaction.findOne({ userId, id });

        if (!Interaction) {
            await interaction.create({ userId, id, liked: true });
            await Model.findByIdAndUpdate(id, { $inc: { likes: 1 } });
            res.status(200).json({ message: 'Liked' });
        } else {
            Interaction.liked = !Interaction.liked;
            await Interaction.save();
            await Model.findByIdAndUpdate(
                id,
                { $inc: { likes: Interaction.liked ? 1 : -1 } }
            );
            res.status(200).json({ message: Interaction.liked ? 'Liked' : 'Unliked' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// add Multiple share count per user
// export const incrementShare = async (req, res) => {
//     const { userId, id } = req.body;

//     try {
//         const Interaction = await gptInteraction.findOne({ userId, id });

//         if (!Interaction || !Interaction.shared) {
//             if (!Interaction) {
//                 await gptInteraction.create({ userId, id, shared: true });
//             } else {
//                 Interaction.shared = true;
//                 await Interaction.save();
//             }

//             await GPT.findByIdAndUpdate(id, { $inc: { shares: 1 } });
//         }

//         res.status(200).json({ message: 'Share count updated' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// add multiple share count
export const ShareFunction = async (req, res) => {
    const { userId, id, type } = req.query;
    typeSwitch(type)
    try {
        // Check if the interaction already exists
        let Interaction = await interaction.findOne({ userId, id });

        if (!Interaction) {
            // If the user has not shared this item before, create a new interaction log
            await interaction.create({ userId, id, shared: true });
        } else {
            // If the user has shared this item before, update the existing log (increment share count)
            Interaction.shared = true;  // Mark it as shared (if not already)
            await Interaction.save();
        }
        await Model.findByIdAndUpdate(id, { $inc: { shares: 1 } });

        res.status(200).json({ message: 'Share count updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};