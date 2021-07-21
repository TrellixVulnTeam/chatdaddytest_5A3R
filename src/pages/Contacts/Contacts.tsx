import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ContactList from '../../Components/ContactList/ContactList';
import './Contact.css';
  import InfiniteScroll from 'react-infinite-scroll-component';
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
    const [nextPage, setNextPage] = useState();
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState(Array.from({ length: 20 }));
    
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
                "Authorization": "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6IjEwMTExMTEwMDAwMDAwMDExMTExMTExMTEwMDAwMTEwMDAwMDAwMDExMDAwMDAwMDAwMDAxMDAxMTExMTExMTExMSIsImlhdCI6MTYyNjg2NzMxMCwiZXhwIjoxNjI2ODcwOTEwLCJ1c2VyIjp7ImlkIjoiYWI4OWUyNWUtNWEyYy00NTU1LThjYjUtNTcxMTYwNmM2ZWQxIiwiZnVsbE5hbWUiOiJ6b29tZGVtbzIiLCJwaG9uZU51bWJlciI6Ijg1MjY1ODc4NTQ0IiwidGVhbUlkIjoiYTAwMTk5NGItOTE4Yi00OTM5LTg1MTgtMzM3NzczMmU0ZTg4In19.a0NX9uCkt2oYY9t3d5CjikyIF1L8tZT9LxUBs_09-99vYE4yOLOo4o4IGYE1D0AghInz5Hc8Sjr40WewYbLWkw"
            }
            })
            .then((response) => response.json())
            .then((data: any) => {
                    setContact(data)
                    
                    if(data.nextPage){
                        setHasMore(true)    
                        setNextPage(data.nextPage)
                    }else{
                        setHasMore(false)    
                    }
                    if(data.contacts){
                        setSearchResults(data.contacts)
                    }
                }
            )
            .catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        
        if(contacts && contacts.contacts) {
            const results = contacts.contacts.filter((contact: any) =>{
                if(contact.name){
                    contact.name.toLowerCase().includes(searchTerm)
                }else{
                    
                }
            }
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

    const fetchData = () => {
          fetch("https://api-im.chatdaddy.tech/contacts?page="+nextPage, {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6IjEwMTExMTEwMDAwMDAwMDExMTExMTExMTEwMDAwMTEwMDAwMDAwMDExMDAwMDAwMDAwMDAxMDAxMTExMTExMTExMSIsImlhdCI6MTYyNjg2NzMxMCwiZXhwIjoxNjI2ODcwOTEwLCJ1c2VyIjp7ImlkIjoiYWI4OWUyNWUtNWEyYy00NTU1LThjYjUtNTcxMTYwNmM2ZWQxIiwiZnVsbE5hbWUiOiJ6b29tZGVtbzIiLCJwaG9uZU51bWJlciI6Ijg1MjY1ODc4NTQ0IiwidGVhbUlkIjoiYTAwMTk5NGItOTE4Yi00OTM5LTg1MTgtMzM3NzczMmU0ZTg4In19.a0NX9uCkt2oYY9t3d5CjikyIF1L8tZT9LxUBs_09-99vYE4yOLOo4o4IGYE1D0AghInz5Hc8Sjr40WewYbLWkw"
            }
            })
            .then((response) => response.json())
            .then((data: any) => {
                    setContact(data)
                    
                    if(data.nextPage){
                        setHasMore(true)    
                        setNextPage(data.nextPage)
                    }else{
                        setHasMore(false)    
                    }
                    if(data.contacts){
                        setSearchResults(   searchResults.concat(data.contacts))
                    }
                    return
                }
            )
            .catch(err => {
            console.error(err);
        });
    }
    
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
                                    { contacts && contacts.contacts  && contacts.contacts.map((tag: any, index: number) => {
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
                                    { contacts && contacts.contacts && contacts.contacts.map((tag: any, index: number) => {
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
                       <div className="all-content-container py-3" id="scrollableDiv">
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

                            <InfiniteScroll        

                              dataLength={searchResults.length} //This is important field to render the next data
                              next={fetchData}
                              hasMore={hasMore}
                              height={800}

                              loader={<h4>Loading more contacts...</h4>}
                              endMessage={
                                <p style={{ textAlign: 'center' }}>
                                  <b>No More Contacts</b>
                                </p>
                              }
                              
                            >

                                { searchResults.length && searchResults.map( (item: any, index: number) => {
                                    return <ContactList item={item} key={index}/>
                                })
                            }
                            
                            </InfiniteScroll>


                                
                       </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}