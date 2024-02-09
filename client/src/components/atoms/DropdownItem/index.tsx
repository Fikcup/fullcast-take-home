import React from 'react';

import { Category } from '../../../types/Category';

interface DropdownItemProps {
    category: Category;
}

const DropdownItem = (props: DropdownItemProps) => {
    const { category } = props; 
    
    return (
        <div className="Dropdown-item">
            {category.categoryName}
            {/* TODO: add dynamic + / - icons */}
            {/* TODO: add edit and delete icons */}
        </div>
    );
};

export default DropdownItem;