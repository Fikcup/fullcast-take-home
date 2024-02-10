// ext dependencies
import React, { ReactNode, useState } from 'react';

// int dependencies
import "./index.css";
import { SortedCategory } from '../../../types/Category';
import AccordionPanel from '../../atoms/AccordionPanel';

interface AccordionCategoryProps {
    category: SortedCategory;
}

const AccordionCategory = (props: AccordionCategoryProps) => {
    const [expanded, setExpanded] = useState(false);
    const [counter, setCounter] = useState(0);
    const { category } = props;

    const handleExpansion = (isExpanded: boolean) => {
        setCounter(counter + 1);
        console.log("category: " + counter);
        setExpanded(isExpanded)
    }

    return (
        <div className="accordion-category">
            <div className="accordion-item-parent">
                <AccordionPanel 
                    category={category}
                    onUpdate={handleExpansion}
                />
            </div>
            <div className="accordion-children-parent">
                {
                    category.children && expanded
                    ? category.children.map((child, index) => (
                        <div 
                            className = "accordion-children"
                            key={`${index}-${child.categoryId}`}
                        >
                            <AccordionCategory 
                                category={child}
                            />
                        </div>
                    ))
                    : null
                }
            </div>
        </div>
    );
};

export default AccordionCategory;