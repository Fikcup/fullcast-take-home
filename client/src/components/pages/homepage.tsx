import React, { useEffect, useState } from "react";
import axios from "axios";

import { SortedCategory } from "../../types/Category";
import AccordionCategory from "../molecules/AccordionCategory";

const Homepage = () => {
    const [categories, setCategories] = useState<SortedCategory[]>([]);

    useEffect(() => {
        const APP_URL = process.env.REACT_APP_APP_URL;
        console.log(APP_URL);
        const apiCalls = async () => {
            await axios({
                method: "GET",
                url: APP_URL + "/api/categories", 
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async (res) => {
                    const categoriesResponse: SortedCategory[] = await res.data;            
                    setCategories(categoriesResponse);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        apiCalls();
    }, []);

    return (
        <div>
            {
                categories.map((category, index) => (
                    <AccordionCategory 
                        category={category} 
                        key={`${index}-${category.categoryId}`}
                    />
                ))
            }
        </div>
    );
};

export default Homepage;