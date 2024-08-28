import React, { useState } from 'react';
import './Filters.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Filters = ({ filters, setFilters }) => {
  const [expanded, setExpanded] = useState({
    workMode: true,
    experience: true,
    salary: true,
    company: true,
    jobType: true,
  });

  const toggleExpand = (section) => {
    setExpanded((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleToggleChange = (name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: prevState[name] === value ? "" : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevState) => {
      const newFilters = { ...prevState };
      
      if (checked) {
        newFilters[name] = newFilters[name] ? [...newFilters[name], value] : [value];
      } else {
        newFilters[name] = newFilters[name].filter((v) => v !== value);
        if (!newFilters[name].length) delete newFilters[name];
      }

      return newFilters;
    });
  };

  return (
    <div className="filters">
      <div className="filter-section">
        <h3 onClick={() => toggleExpand('workMode')}>
          Work Mode {expanded.workMode ? <i className="fa-solid fa-angle-down" style={{ color: '#a1a1a1' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#a1a1a1' }}></i>}
        </h3>
        {expanded.workMode && (
          <div className="filter-options work-mode-options">
            <div className='kkk'>
            {['Hybrid', 'Remote', 'Full Time Office'].map((mode) => (
              <button
                key={mode}
                className={`toggle-button ${filters.workMode === mode ? 'selected' : ''}`}
                onClick={() => handleToggleChange('workMode', mode)}
              >
                {mode}
              </button>
            ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
      <h3 onClick={() => toggleExpand('experience')}>
        Experience {expanded.experience ? <i className="fa-solid fa-angle-down" style={{ color: '#a1a1a1' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#a1a1a1' }}></i>}
      </h3>
        {expanded.experience && (
          <div className="filter-options experience-options">
            <div className="experience-input">
              <input
                type="number"
                name="experience"
                value={filters.experience || ''}
                onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                placeholder=""
              />
              <div className="experience-controls">
                <button
                  onClick={() =>
                    setFilters((prevState) => ({
                      ...prevState,
                      experience: (parseInt(prevState.experience || 0) + 1).toString(),
                    }))
                  }
                >
                  <i className="fa-solid fa-angle-up"></i>
                </button>
                <button
                  onClick={() =>
                    setFilters((prevState) => ({
                      ...prevState,
                      experience: Math.max(parseInt(prevState.experience || 0) - 1, 0).toString(),
                    }))
                  }
                >
                  <i className="fa-solid fa-angle-down"></i>
                </button>
              </div>
            </div>
            <div className="lll"><p>Enter your experience in years</p></div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3 onClick={() => toggleExpand('salary')}>
          Salary {expanded.salary ? <i className="fa-solid fa-angle-down" style={{ color: '#a1a1a1' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#a1a1a1' }}></i>}
        </h3>
        {expanded.salary && (
          <div className="filter-options salary-options">
            <div className="salary-inputs">
            <h5>From</h5>
              <input
                type="number"
                name="salaryFrom"
                value={filters.salaryFrom || ''}
                onChange={(e) => setFilters({ ...filters, salaryFrom: e.target.value })}

              />
              <h5>Per Annum</h5>
            </div>
            <div className="salary-range">
              {['1 - 5 LPA', '6 - 10 LPA', '11 - 15 LPA', '16 - 20 LPA', '21 - 25 LPA', '26 - 30 LPA', '> 30 LPA'].map((range) => (
                <button
                  key={range}
                  className={`toggle-button salary-toggle-button ${filters.salary === range ? 'selected' : ''}`}
                  onClick={() => handleToggleChange('salary', range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3 onClick={() => toggleExpand('company')}>
          Company {expanded.company ? <i className="fa-solid fa-angle-down" style={{ color: '#a1a1a1' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#a1a1a1' }}></i>}
        </h3>
        {expanded.company && (
          <div className="filter-options company-options">
            <input
              type="text"
              placeholder="Search for companies"
              className="searchInput"
            />
            <div className="company-list">
              {[
                'Apple Inc',
                'Google LLC',
                'Microsoft Corporation',
                'Amazon.com Inc',
                'Tesla Inc',
                'The Coca Cola Company',
              ].map((company) => (
                <label key={company} className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    name="company"
                    value={company}
                    checked={filters.company?.includes(company) || false}
                    onChange={handleCheckboxChange}
                  />
                  <span className="custom-checkbox"></span>
                  {company}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3 onClick={() => toggleExpand('jobType')}>
          Job Type {expanded.jobType ? <i className="fa-solid fa-angle-down" style={{ color: '#a1a1a1' }}></i> : <i className="fa-solid fa-angle-right" style={{ color: '#a1a1a1' }}></i>}
        </h3>
        {expanded.jobType && (
          <div className="filter-options job-type-options">
            <div className='ppp'>
              {['Permanent', 'Contract', 'Freelancing'].map((type) => (
                <button
                  key={type}
                  className={`toggle-button ${filters.jobType === type ? 'selected' : ''}`}
                  onClick={() => handleToggleChange('jobType', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
