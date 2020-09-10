import React, { Component, Fragment } from 'react'
import { CardContent, Typography, Card } from '@material-ui/core'
import './../Components/Message.css';

export default class Message extends Component {
    scrollToBottom = () => {
        const { messageList } = this.refs;
        messageList.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }
    componentDidMount = () => {
        this.scrollToBottom()
    }
    componentDidUpdate = () => {
        this.scrollToBottom()
    }
    // toDateTime = (secs) => {
    //     var t = new Date(Date.UTC(1970, 0, 1)); // Epoch
    //     t.setUTCSeconds(secs);
    //     return t;
    // }
    // toDateTime(this.props.messages.timestamp.seconds)
    render() {
        // console.log(this.props);
        // console.log("hdhdh",this.props.messages.username, this.props.username)
        const isUser = this.props.username === this.props.messages.username;
        // console.log(isUser)
        let str = this.props.messages.message
            let letterCount = str.split(/\W/).join('').length
            // console.log(letterCount);
            if(letterCount > 50){
                var style = {
                    display: "block",
                    wordBreak: "break-word",
                    width: "200px",
                    textAlign: "initial"
                }
            }
            // console.log()
            
        return (
            
            <Fragment>
                 <span className="message__username">{!isUser && `${this.props.messages.username || 'Unknown'}`}</span>
            
            <div ref="messageList"  className= {`${isUser ? 'message__user': ' message__guest'}`} >
               
                <Card className={`${isUser ? 'message__userCard' : 'message__guestCard'}`} >
                    
                    <CardContent>
                        <Typography style={style} color="white" variant="h5" component="h2">
                         {this.props.messages.message}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
            </Fragment>
        )
    }
}
