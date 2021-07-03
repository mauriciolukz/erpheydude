import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { menuService } from '../../../services';

const menu = {"menu_side": []};

function Home(props) {

    console.log("info",props)

    const [menu, setMenu] = useState(null);
    const [LoadingCards,setLoadingCards] = useState(false);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (!menu) {
            getMenu();
        }
    }, []);

    const getMenu = async () => {
        const data = await menuService.menu();
        setMenu(data.menu_side);
    }

    const handleLoadPage = async (id_card,e) => {
        setLoadingCards(true);
        setCards(null);
        let listCards =  await menuService.cards(id_card);
        if (Object.keys(listCards).length > 0) {
            setCards(listCards.cards);
        }
        setLoadingCards(false);
    };

    const handleLoadModal =  (card_id,sub_item_id,e) => {
        let card = cards.cards.filter(card => card.card_id === card_id && card.card_items.filter(item => item.sub_item_id === sub_item_id));
        let item = card[0]["card_items"].filter(item => item.sub_item_id === sub_item_id);
        console.log(item);
        /* props.modalOpen(item,true); */
    };

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-danger">
                <div className="container-fluid">
                    <a className="navbar-brand text-white font-weight-bold" href="#">Heydude ERP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                menu === null &&
                                <div className="spinner-border text-primary row col-12" role="status"><span className="visually-hidden">Loading...</span></div>
                            }
                            {menu !== null &&
                                menu.map((item, index) => (
                                    <li className="nav-item" key={index.toString()}>
                                        <a className="nav-link active text-white font-weight-bold" aria-current="page" href="#" onClick={(e) => handleLoadPage(item.item_id,e)}>
                                            {/* <JsxParser
                                                components={faUser}
                                                jsx={item.item_icon}/> */}
                                            {item.item_name}
                                        </a>
                                    </li>
                                ))
                            }
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser}/> 
                                     Welcome {props.user.SY01400.USERID}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item font-weight-bold" href="#">Configurar</a></li>
                                    <li><a className="dropdown-item font-weight-bold" href="#">Cerrar sesion</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="row">
                { 
                  LoadingCards &&
                    <div className="col-lg-12">
                        <div className='text-center p-3'>
                            <div className="spinner-border text-danger row col-12" role="status"><span className="visually-hidden">Loading...</span></div>
                        </div>
                    </div>
                }
                {
                  cards !== null &&
                    
                    cards.map((element,index) => {
                      return (
                          <div className="col-lg-4 mt-2 mb-2" key={index}>
                            <div className="card">
                              <div className="card-header bg-danger text-white font-weight-bold">
                                <div className="row">
                                  <div className="col-auto pr-1">
                                    {/* <JsxParser
                                      components={{FolderOpen,Settings}}
                                      jsx={element.card_icon}
                                    /> */}
                                  </div>
                                  <div className="col-auto pl-0">{element.card_name}</div>
                                </div>
                              </div>
                              <div className="card-body">
                                <ul className="list-group">
                                  {
                                    element.card_items.map((sub_element,index) => {
                                      return(
                                              <li className="list-group-item" key={index}>
                                                <button type="button" className="list-group-item list-group-item-action" onClick={(e) => handleLoadModal(element.card_id,sub_element.sub_item_id,e)}>{sub_element.item_name}</button>
                                              </li>
                                            )
                                    }) 
                                  }
                                </ul>
                              </div>
                            </div>
                          </div> 
                        )
                    })
                }
            </div>

        </div> 
    )
}

const mapStateToProps = (state) => {
    const { user } = state.user;
    console.log("state",state);
    return { user };
    /*const { modal } = state;
    return { modal };  */ 
  }
  
  const mapDispatchToProps = {
    //modalOpen: modalActions.open
  }
  
  export default connect(mapStateToProps, /*mapDispatchToProps*/ null)(Home)


