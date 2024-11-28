'use client'
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// Clipboard utility function
export const copyTextToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation",
];
const inspectionMergeFields = ["InspectionCompleteDate", "InspectionEventType"];

const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
    const optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGrouplabel);
    mergeFields.forEach((field) => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("class", "merge-field-select-option");
        optionElement.setAttribute("value", field);
        optionElement.text = field;
        optionGroupElement.appendChild(optionElement);
    });
    return optionGroupElement;
};

const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
        name: "insertMergeField",
        tooltip: "Insert Merge Field",
        iconURL: "images/merge.png",
        popup: (editor, current, self, close) => {
            const onSelected = (e) => {
                const mergeField = e.target.value;
                if (mergeField) {
                    editor.selection.insertNode(
                        editor.create.inside.fromHTML("{{" + mergeField + "}}")
                    );
                }
            };

            const divElement = editor.create.div("merge-field-popup");

            const labelElement = document.createElement("label");
            labelElement.setAttribute("class", "merge-field-label");
            labelElement.textContent = "Merge field: ";
            divElement.appendChild(labelElement);

            const selectElement = document.createElement("select");
            selectElement.setAttribute("class", "merge-field-select");
            selectElement.appendChild(
                createOptionGroupElement(facilityMergeFields, "Facility")
            );
            selectElement.appendChild(
                createOptionGroupElement(inspectionMergeFields, "Inspection")
            );
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            return divElement;
        },
    },
    {
        name: "copyContent",
        tooltip: "Copy HTML to Clipboard",
        iconURL: "images/copy.png",
        exec: (editor) => {
            const html = editor.value;
            copyTextToClipboard(html);
        },
    },
];

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true,
    },
    // width: 800,
    width: 'calc(100% - 4px)',
    height: 842,
};

const JoditEditorComp = ({ value, onChange }) => {
    return (
        <div
            className="JoditEditorComponent"
            style={{ maxWidth: editorConfig.width, margin: "0 auto" }}
        >
            <JoditEditor
                value={value}
                config={editorConfig}
                onChange={onChange}
            />
        </div>
    );
};

export default JoditEditorComp;
