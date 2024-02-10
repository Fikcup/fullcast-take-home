import React, { useEffect, useState } from "react";

import "./homepage.css";
import CategoryList from "../organisms/CategoryList";

const Homepage = () => {

    return (
        <main className="main">
            <section className="category-list">
                <CategoryList />
            </section>
            <section className="notes">

            </section>
        </main>
    );
};

export default Homepage;