"use client";

import Filters from "@/components/JobComponents/Filter.jsx";
import JobList from "@/components/JobComponents/JobList.jsx";
import Alerts from "@/components/JobComponents/Alert.jsx";
import Header from "@/components/JobComponents/Header.jsx"
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./style.css";
import "./searchbar.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loading from "@/app/loading";

export default function JobPortal() {
  const [filters, setFilters] = useState({
    workMode: "",
    experience: "",
    salary: "",
    company: "",
    jobType: "",
  });

  const [searchFields, setSearchFields] = useState({
    keyword: "",
    location: "",
  });

  const [submittedSearchFields, setSubmittedSearchFields] = useState({});
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Simulate data fetching or other async operations
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after data is "loaded"
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const { keyword, location } = searchFields;
      if (keyword && location) {
        setSubmittedSearchFields(searchFields);
        console.log("Searching with:", searchFields);
      } else {
        alert("Please enter all fields before searching.");
      }
    },
    [searchFields]
  );

  if (isLoading) {
    return <Loading />; // Render Loading component while isLoading is true
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, transition: { duration: 0 } }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 },
      }}
    >
      <Header />

      <div className="app">
        <div className="search-bar-container">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="input-group-1">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                name="keyword"
                placeholder="Job title or keyword"
                value={searchFields.keyword}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <div className="input-group-2">
              <i className="fa-solid fa-location-dot"></i>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={searchFields.location}
                onChange={handleSearchChange}
                className="location-input"
              />
            </div>
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
        <div className="content">
          <div className="filter-container">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          <div className="job-list-container">
            <JobList filters={filters} searchFields={submittedSearchFields} />
          </div>
          <div>
            <Alerts />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
