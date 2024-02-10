// ext dependencies
import React, { ReactNode, useState } from 'react';
import { 
    BiCaretDown,
    BiCaretUp,
    BiFolderPlus,
    BiSolidPencil,
    BiSolidTrashAlt
} from "react-icons/bi";

// int dependencies
import "./index.css";
import { SortedCategory } from '../../../types/Category';

interface AccordionPanelProps {
    category: SortedCategory;
    onUpdate: (isExpanded: boolean) => void;
}

const AccordionPanel = (props: AccordionPanelProps) => {
    const [expanded, setExpanded] = useState(false);
    const { category, onUpdate } = props; 

    const handleExpansion = () => {
        const expansionValue = !expanded;
        setExpanded(expansionValue);
        onUpdate(expansionValue); 
    }

    return (
        <div className="accordion-item-parent">
            <button 
                className={
                    category.children 
                    ? "accordion-expand-button"
                    : "hidden-accordion-expand-button"
                }
                onClick={() => handleExpansion()}
            >
                { 
                    expanded
                    ? <BiCaretDown />
                    : <BiCaretUp />
                }
            </button>
            <div className="accordion-item">
                <div className="accordion-update-delete">
                    <button 
                        className="accordion-collapse" 
                        
                    >
                        <BiFolderPlus />
                    </button>
                </div>
                {category.categoryName}

                <div className="accordion-update-delete">
                    <button className="accordion-edit">
                        <BiSolidPencil />
                    </button>
                    <button className="accordion-delete">
                        <BiSolidTrashAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccordionPanel;