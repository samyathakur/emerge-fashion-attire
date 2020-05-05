import React from 'react';

import SHOP_DATA from './shop.data.js'

import CollectionPreview from '../../components/collection-preview/collection-preview.component'


// we need to store data related to actual collection on shop page, so making class component(for now)
class ShopPage extends React.Component{
    constructor (props){
        super(props);

        this.state = {
            collections: SHOP_DATA,
        }
    }

    render(){
        const {collections} = this.state;
        return(
            <div className = "shop-page">
                {
                    collections.map(({id, ...otherCollectionProps})=> (
                        <CollectionPreview key = {id} {...otherCollectionProps} />
                    ))
                }
            </div>
        );
    }
}

export default ShopPage; 