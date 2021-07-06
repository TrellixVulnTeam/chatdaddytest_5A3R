import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ContactList from '../../Components/ContactList/ContactList';
import './Contact.css';

interface ContactLists {
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

export default function Contact() {
    const [contacts, setContact]: any = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<ContactLists[]>([]);
   
    const [minNumber, setMinSentNumber] = useState(0);
    const [maxNumber, setMaxSentNumber] = useState(0);
    const [minNumberRec, setMinRecNumber] = useState(0);
    const [maxNumberRec, setMaxRecNumber] = useState(0);
    const [includeTag, setActiveTag] = useState(false);
    const [excludeTag, setExcludeTag] = useState(false);
    const [includeTagContent, setIncludeTagContent] = useState([]);
    const [excludeTagContent, setExcludeTagContent] = useState([]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        fetch("https://api-im.chatdaddy.tech/contacts", {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWI4OWUyNWUtNWEyYy00NTU1LThjYjUtNTcxMTYwNmM2ZWQxIiwidXNlcm5hbWUiOiJ6b29tZGVtbzIiLCJ0ZWFtSWQiOiI0ZDhkM2ZiYi05MDliLTRjOTgtYmM4Yy1lYmFjMjFkZjY3MDciLCJ0ZWFtT3duZXIiOiJhYjg5ZTI1ZS01YTJjLTQ1NTUtOGNiNS01NzExNjA2YzZlZDEiLCJsaW1pdHMiOnsic2VhdHMiOjEsIm1lbWJlcnMiOjEwfSwidHlwZSI6MCwiY3JlYXRlZEZyb20iOjB9LCJzY29wZSI6IjExMTExMTEwMDAwMDAwMDExMTExMTEwMDEwMDAxMTAwMTAxMDEwMDExMDEwMTAxMDAxMTAxMTAxMTExMTExMTExMTAwMDAwMTAwMDAwMDAxMSIsImV4cCI6MTYyNTU3MDQyNywiaWF0IjoxNjI1NTY2ODI3fQ.sModG1n98nSYpvfG8dcGRVWYSWnlAWuelXVOerhx0kykZvdYVTkqdTUmiQykXmspXkvYuy-QWF_s2VPzB6njdQ"
            }
            })
            .then((response) => response.json())
            .then((data: any) => {
                    setContact(data)
                }
            )
            .catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if(contacts) {
            const results = contacts.contacts.filter((contact: any) =>
                contact.name.toLowerCase().includes(searchTerm)
            );
            setSearchResults(results);
        }
    }, [searchTerm]);

    const handleFilter = () => {
        const result = contacts.contacts.map((contact: any) => {
                if(contact.messagesSent > minNumber && contact.messagesSent < maxNumber || contact.messagesSent == minNumber && contact.messagesSent == maxNumber || contact.messagesReceived > minNumber && contact.messagesReceived < maxNumber || contact.messagesReceived == minNumber && contact.messagesReceived == maxNumber)  {
                    return contact
                }
         
        });     
        setSearchResults(result);
    }

    const handleIncludeTab = (value: any) => {
        setActiveTag(!includeTag);
        setIncludeTagContent(value)
    }

    const handleExcludeTab = (value: any) => {
        setExcludeTag(!excludeTag);
        setExcludeTagContent(value)
    }

    const handleMinMaxValue = (e: any, value: string) => {
        switch(value) {
            case 'minSent':
               console.log(e.target.value);
               setMinSentNumber(e.target.value);
              break;
            case 'maxSent':
                setMaxSentNumber(e.target.value);
              break;
              case 'minRec':
                setMinRecNumber(e.target.value);
              break;
            case 'maxRec':
                setMaxRecNumber(e.target.value);
              break;
            default:
               return
          }
    }

    console.log(contacts)

    return(
        <Fragment>
            <Container>
                <Row>
                    <Col lg={4}>
                        <div className="sidebar">
                            <div className="sidebar-content">
                                <div className="sidebar-header d-flex align-items-center justify-content-between">
                                    <div className="">
                                        <h5>Audience</h5>
                                    </div>
                                    <h6>{searchResults.length} contacts</h6>
                                </div>
                                <div className="include-tags mb-3">
                                    <h6>Include Tags:</h6>
                                    { contacts && contacts.contacts.map((tag: any, index: number) => {
                                        return tag.tags && tag.tags.map((tag: any, index: number) => {
                                            return <div className="tag-list d-flex align-items-center justify-content-between" key={index} onClick={()=> handleIncludeTab(tag.name)}>
                                                <div className="tag-name">
                                                    <h6>{tag.name}</h6>
                                                </div>
                                                <div className="tag-action d-flex align-items-center">
                                                    <div className="delete-icon mr-3">
                                                        <i className="fas fa-trash"></i>
                                                    </div>
                                                    { includeTag && <div className="selected-icon mr-3">
                                                        <i className="fas fa-check-circle"></i>
                                                    </div>}
                                                </div>
                                            </div>
                                        })                                        
                                    }) }
                                </div>
                                <div className="include-tags mb-3">
                                    <h6>Exclude Tags:</h6>
                                    { contacts && contacts.contacts.map((tag: any, index: number) => {
                                        return tag.tags && tag.tags.map((tag: any, index: number) => {
                                            return <div className="tag-list d-flex align-items-center justify-content-between" key={index} onClick={()=> handleExcludeTab(tag.name)}>
                                                <div className="tag-name">
                                                    <h6>{tag.name}</h6>
                                                </div>
                                                <div className="tag-action d-flex align-items-center">
                                                    <div className="delete-icon mr-3">
                                                        <i className="fas fa-trash"></i>
                                                    </div>
                                                    { excludeTag && <div className="selected-icon mr-3">
                                                        <i className="fas fa-check-circle"></i>
                                                    </div>}
                                                </div>
                                            </div>
                                        })                                        
                                    }) }
                                </div>
                                <div className="include-tags mb-3">
                                    <h6>Message Sent:</h6>
                                    <div className="message-input-fields">
                                        <div className="input-message d-flex">
                                            <Form.Control type="number" placeholder="Min" className="input-message mr-2" value={minNumber} onChange={(e) => handleMinMaxValue(e, 'minSent')}/>
                                            <Form.Control type="number" placeholder="Max" className="input-message" value={maxNumber} onChange={(e) => handleMinMaxValue(e, 'maxSent')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="include-tags mb-3">
                                    <h6>Message Received:</h6>
                                    <div className="message-input-fields">
                                        <div className="input-message d-flex">
                                            <Form.Control type="number" placeholder="Min" className="input-message mr-2" value={minNumberRec} onChange={(e) => handleMinMaxValue(e, 'maxRec')}/>
                                            <Form.Control type="number" placeholder="Max" className="input-message" value={maxNumberRec} onChange={(e) => handleMinMaxValue(e, 'maxRec')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-btn">
                                <Button type="submit" onClick={handleFilter}>
                                    save filters
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                       <div className="all-content-container py-3">
                            <div className="d-flex align-items-center justify-content-between pb-3">
                                <h4>All Contacts({searchResults.length})</h4>
                                <div className="add-icon">
                                    <i className="fas fa-plus-circle"></i>
                                </div>
                            </div>
                            <div className="search-input position-relative">
                                <Form.Control type="text" placeholder="Min" className="search-contact" value={searchTerm} onChange={handleChange} />
                                <i className="fa fa-search position-absolute" aria-hidden="true"></i>
                            </div>
                            <div className="select-contact d-flex align-items-center justify-content-between py-3">
                                <div className="checkbox-custom">
                                    <Form.Check type="checkbox" label="Select All"/>
                                </div>
                                <div className="export-btn">
                                    <Button type="submit">
                                        Export All
                                    </Button>
                                </div>
                            </div>  
                                { searchResults.length && searchResults.map( (item: any, index: number) => {
                                    return <ContactList item={item} key={index}/>
                                })
                            }
                       </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}