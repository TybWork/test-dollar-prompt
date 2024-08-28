import React from 'react'
import MessageSender from '../(DashboardsLiteComponent)/MessageSender/MessageSender'
import MessageReceiver from '../(DashboardsLiteComponent)/MessageReceiver/MessageReceiver'

const ChatComponent = () => {
    return (
        <div>
            <MessageSender text={'hello Mudasir asdfasdf asdfass dfass asdfa asdsfa sdfass dfassd f asdf asdfa sdf as sfdafs fda'} />
            <br />
            <MessageReceiver text={'hello Mudasir asdfasdf asdfass dfass asdfa asdsfa sdfass dfassd f asdf asdfa sdf as sfdafs fda'} />
            <br />
            <MessageSender text={'hello Mudasir asdfasdf asdfass dfass asdfa asdsfa sdfass dfassd f asdf asdfa sdf as sfdafs fda'} />
            <br />
            <MessageReceiver text={'hello Mudasir asdfasdf asdfass dfass asdfa asdsfa sdfass dfassd f asdf asdfa sdf as sfdafs fda'} />
            <br />
            {/* <MessageReceiver text={'hi sd'} /> */}
        </div>
    )
}

export default ChatComponent