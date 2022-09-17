import Notification from './notification.js';

let messageInstance;

//防止重复创建实例
function getMessageInstance() {
    //没有传参
    messageInstance = messageInstance || Notification.newInstance();
    return messageInstance;
}

function notice({duration = 1.5,content=""}) {
    let instance = getMessageInstance();

    instance.add({
        content:content,
        duration:duration
    })
}

export default {
    //暴露一个info方法来调用
    info(options){
        return notice(options);
    }
}