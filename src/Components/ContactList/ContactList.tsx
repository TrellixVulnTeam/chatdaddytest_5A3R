import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    name: String;
    phoneNumber: String;
    assignee: null;
    chats: [];
    id: number;
    messagesReceived: number;
    messagesSent: number;
    platformNames: [];
    tags: Tags[];
    type: String;
}

interface Tags {
    name: string
}

interface Items {
    item: Props
}

const ContactList: React.FC<Items> = (props) => {
    return(
        <Fragment>
            {props && props.item && <div className="contact-list">
                <div className="contact-list-item d-flex align-items-center justify-content-between">
                    <div className="contact-list-details d-flex align-items-center">
                        <div className="">
                            <Form.Check type="checkbox" name={`selectRow_${props.item.name}`}/>
                        </div>
                        <div className="contact-img">
                            <img src="https://via.placeholder.com/50" alt=""/>
                        </div>
                        <div className="contact-info">
                            <h5>{props && props.item && props.item.name}</h5>
                            <p>+67675675676</p>
                        </div>
                    </div>
                    <div className="tag-container d-flex align-items-center">
                        {props && props.item && props.item.tags.map((tag, index) => {
                           return <div className="tag-content" key={index}>
                                <span >{tag.name}</span>
                                <i className="fa fa-times"></i>
                            </div>
                        })}
                        <div className="add-icon">
                            <i className="fas fa-plus-circle"></i>
                        </div>
                    </div>
                </div>
            </div>}
        </Fragment>
    );
}

export default ContactList