import { useContext, useEffect, useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import "./Foods.css";
import { StoreContext } from "../../context/StoreContext";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";

const Foods = () => {
    const { foodList, fetchFoodList, currentFetchFoodUrl } = useContext(StoreContext);
    const [searchValue, setSearchValue] = useState('');
    const [searchingText, setSearchingText] = useState('');
    const [loadingButtons, setLoadingButtons] = useState({
        search: 'Search',
        clear: 'Clear'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= currentFetchFoodUrl.totalPages) {
            setCurrentPage(pageNumber);
        }

        fetchFoodList(pageNumber, currentFetchFoodUrl.limit, currentFetchFoodUrl.search, currentFetchFoodUrl.category, currentFetchFoodUrl.priceShort);
    }
    const handleSearch = (value, action) => {
        let pageNumber = currentFetchFoodUrl.page;
        if(value.length) {
            if(action === 'Searching') {
                setLoadingButtons({ search: 'Searching', clear: 'Clear'});
            } else {
                setLoadingButtons({ search: 'Search', clear: 'Clearing'});
            }
        }

        if(action === 'Clearing') {
            pageNumber = 1;
            setCurrentPage(1);
        }
        setSearchValue(value);        
        fetchFoodList(pageNumber, currentFetchFoodUrl.limit, value, currentFetchFoodUrl.category, currentFetchFoodUrl.priceShort);
        setSearchingText(value)
    }

    useEffect(() => {
        if(searchValue.length) {
            setLoadingButtons({
                search: 'Search',
                clear: 'Clear'
            })
        }
    }, [foodList])
    
    return (
        <div className="home" id="foods-menu">
            <div className="header">
                <div className="header-content">
                    <h2>Search your favorite food here</h2>
                    <p>
                        Choose from a diverse menu featuring a delectable array of dishes
                        crafted with the finest ingredients and culinary expertise. Our
                        mission is to satisfy your cravings and elevate your dining
                        experience, one delicious meal at a time.
                    </p>
                </div>
            </div>
            <ExploreMenu />
            <div className="search-container">
                <input type="text" placeholder="Search Your Favourite Foods From Here..." className="search-input" onChange={e => setSearchValue(e.target.value)} value={searchValue} />
                <button className="search-btn" onClick={() => handleSearch(searchValue, 'Searching')} disabled={loadingButtons.search === 'Searching' || loadingButtons.clear === 'Clearing'}> {loadingButtons.search}</button>
                <button className="clear-btn" onClick={() => handleSearch('', 'Clearing')} disabled={loadingButtons.search === 'Searching' || loadingButtons.clear === 'Clearing'}>{loadingButtons.clear}</button>
            </div>
            <FoodDisplay searchQuery={searchingText} />
            {
                foodList.length > 0 && <div className="pagination">
                    <button className="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>« Previous</button>
                    {
                        [...Array(currentFetchFoodUrl.totalPages)].map((_, index) => (
                            <button key={index} className={`page-number ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}> { index + 1 }</button>
                        ))
                    }
                    <button className="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === currentFetchFoodUrl.totalPages}>Next »</button>
                </div>
            }
        </div>
    );
};

export default Foods;
