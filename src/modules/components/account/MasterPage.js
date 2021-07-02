import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { menuService } from '../../../services';

const menu = {"menu_side": []};

function MasterPage(props) {

    const [menu, setMenu] = useState('');
    const [LoadingCards,setLoadingCards] = useState(false);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (!menu) {
            getMenu();
        }
    }, []);

    const getMenu = async () => {
        const data = await menuService.menu();
        setMenu(data);
    }

    const handleLoadPage = async (id_card,e) => {
        setLoadingCards(true);
        setCards(null);
        let listCards =  await menuService.cards(id_card);
        if (listCards) {
            setCards(listCards);
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
        <div class="container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light bg-danger">
                <div class="container-fluid">
                    <a class="navbar-brand text-white font-weight-bold" href="#">Heydude ERP</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                menu.menu_side === undefined &&
                                <div class="spinner-border text-primary row col-12" role="status"><span class="visually-hidden">Loading...</span></div>
                            }
                            {menu.menu_side !== undefined &&
                                menu.menu_side.map((item, index) => (
                                    <li class="nav-item">
                                        <a class="nav-link active text-white font-weight-bold" aria-current="page" href="#" onClick={(e) => handleLoadPage(item.item_id,e)}>
                                            {/* <JsxParser
                                                components={faUser}
                                                jsx={item.item_icon}/> */}
                                            {item.item_name}
                                        </a>
                                    </li>
                                ))
                            }
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white font-weight-bold" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser}/> Dropdown
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item font-weight-bold" href="#">Configurar</a></li>
                                    <li><a class="dropdown-item font-weight-bold" href="#">Cerrar sesion</a></li>
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
                            <div class="spinner-border text-danger row col-12" role="status"><span class="visually-hidden">Loading...</span></div>
                        </div>
                    </div>
                }
                {
                  cards != null &&
                
                    cards.cards.map((element,index) => {
                      return (
                          <div className="col-lg-4" key={index}>
                            <div className="card">
                              <div className="card-header">
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
    //const { modal } = state;
    //return { modal };  
  }
  
  const mapDispatchToProps = {
    //modalOpen: modalActions.open
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MasterPage)

