import React from 'react'
import WishlistModalWrapper from '../ui/modal/wishlist-wrapper';

function AddWishlist({
    isOpen,
    setIsModalOpen,
    id,
    thumbnail,
}:{
    isOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    id: string;
    thumbnail: string;
}) {
    return (
        <WishlistModalWrapper 
            isOpen={isOpen}
            setIsOpen={setIsModalOpen}
            title="Add to Wishlist" 
        >
            <div>AddWishlist</div>
        </WishlistModalWrapper>
    )
}

export default AddWishlist