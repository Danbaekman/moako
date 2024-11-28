import React from "react";
import GoldCard from "../components/Goldcard";
import AddTransaction from "../components/AddTransaction";
import GoldList from "../components/GoldList";

const Home = ({ currentGold, addTransaction, history }) => {
  return (
    <div className="p-4 space-y-4">
      <GoldCard currentGold={currentGold} />
      <AddTransaction addTransaction={addTransaction} />
      <GoldList history={history} />
    </div>
  );
};

export default Home;
