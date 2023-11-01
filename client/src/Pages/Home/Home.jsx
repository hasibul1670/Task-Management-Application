/* eslint-disable no-unused-vars */
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";

import PrivateRoute from "./../../Routes/PrivateRoute";
import NotePage from "./NotePage";
import TakeNote from "./TakeNote";
import { useGetAllNotesQuery } from "../../redux/features/note/noteApi";

const Home = () => {

  const { data, isLoading } = useGetAllNotesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const noteArray = data?.data;
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredNotes(noteArray);
  }, [noteArray]);

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredNotes(noteArray);
    } else {
      const options = {
        keys: ["title", "category", "noteDescription"],
        threshold: 0.3,
      };
      const fuse = new Fuse(noteArray, options);
      const filtered = fuse.search(searchTerm);
      setFilteredNotes(filtered.map((result) => result.item));
    }
  }, [searchTerm, noteArray]);

  return (
    <div className="mb-5">
      <NavBar onSearchChange={handleSearchChange} />
      <NotePage filteredNotes={filteredNotes} isLoading ={isLoading} />
      <PrivateRoute>
        <TakeNote />{" "}
      </PrivateRoute>
      <Footer />
    </div>
  );
};

export default Home;
