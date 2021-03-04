import React, { useState, useEffect } from 'react';
import User from '../Component/user';

import './userList.css';

const UserList = () => {

    const [name, setName] = useState([]);
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])


    
    async function fetchData() {
        const nameArray = [];
        const priceDataArray = [];

        const response = await fetch('mock-data-customer.json');
        const responseData = await response.json();

        for(const item in responseData){ // get the names of a 
            let date =  new Date(responseData[item].date);
                        
            priceDataArray.push({
                name: responseData[item].name,
                orderPrice: responseData[item].orderprice,
                month: date.getMonth() + 1
            })

            if(nameArray.indexOf(responseData[item].name) === -1){
                nameArray.push(responseData[item].name);
            }         
        }

        setName(nameArray);
        setPriceData(priceDataArray);
    }

    const calculateReward = (name, month) => {
        let totalReward = 0;
        for(const item in priceData){
            if(priceData[item].month === month && priceData[item].name === name){
                if(priceData[item].orderPrice > 50 && priceData[item].orderPrice <= 100){
                    totalReward = totalReward + priceData[item].orderPrice - 50;
                } else if (priceData[item].orderPrice > 100) {
                    totalReward = totalReward + (priceData[item].orderPrice - 100)*2 + 50
                }
            }
        }
        return totalReward;
        
    }

    const calculateTotal = (name, month) => {
        let totalPrice= 0;
        for(const item in priceData){
            if(priceData[item].month === month && priceData[item].name === name){
                totalPrice = totalPrice + priceData[item].orderPrice;
            }
        }
        return totalPrice;
    }

    const renderedList = name.map(user => (
        <User
            key={user}
            name={user}
            JanTotal = {calculateTotal(user, 1)}
            FebTotal = {calculateTotal(user, 2)}
            MarTotal = {calculateTotal(user, 3)}
            JanPoints = {calculateReward(user, 1)}
            FebPoints = {calculateReward(user, 2)}
            MarPoints = {calculateReward(user, 3)}/>
    ))

    return (
        <div className="container">
            <h1 className="title">Customer Rewards Table</h1>
            <table className="data-table">
            <tbody>
            <tr>
                <th>Name</th>
                <th>January Points</th>		
                <th>Feburary Points</th>
                <th>March Points</th>
                <th>Total Reward Points</th>
                <th>Total Spend</th>
            </tr>
                {renderedList}
             </tbody>
            </table>
            
        </div>
    )
}

export default UserList;