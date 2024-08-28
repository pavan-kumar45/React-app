import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import './JobCard.css';

const JobList = ({ filters, searchFields }) => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'SAP UI Developer',
      company: 'Apple Inc',
      logo: '/CompanyLogos/image.png',
      experience: '1 - 2 Yrs',
      salary: '30 - 35 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Full Time Office',
      jobType: 'Permanent',
      datePosted: '4 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    },
    {
      id: 2,
      title: 'Node & Express JS Developer',
      company: 'Microsoft Corporation',
      logo: '/CompanyLogos/image.png',
      experience: '1 - 2 Yrs',
      salary: '14 - 15 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Hybrid',
      jobType: 'Permanent',
      datePosted: '14 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'Google LLC',
      logo: '/CompanyLogos/image.png',
      experience: '5 - 10 Yrs',
      salary: '5 - 10 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Remote',
      jobType: 'Permanent',
      datePosted: '14 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    },
    {
      id: 4,
      title: 'Node & Express JS Developer',
      company: 'Amazon.com Inc',
      logo: '/CompanyLogos/image.png',
      experience: '1 - 2 Yrs',
      salary: '10 - 20 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Full Time Office',
      jobType: 'Permanent',
      datePosted: '14 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'Tesla Inc',
      logo: '/CompanyLogos/image.png',
      experience: '1 - 2 Yrs',
      salary: '14 - 15 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Full Time Office',
      jobType: 'Permanent',
      datePosted: '14 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    },
    {
      id: 6,
      title: 'Software Engineer',
      company: 'The Coca Cola Company',
      logo: '/CompanyLogos/image.png',
      experience: '1 - 2 Yrs',
      salary: '14 - 15 Lakhs PA',
      location: 'Bengaluru',
      workMode: 'Full Time Office',
      jobType: 'Permanent',
      datePosted: '14 days ago',
      description: 'Join our team as a Senior Software Engineer! We are looking for an experienced professional with strong skills in software design, development, and implementation. You will work with cross-functional teams, write efficient code, and mentor junior developers.',
      responsibilities: [
        'Understand business requirements and identify the best approach to serve the requirement without risking the system’s conceptual sanity.',
        'Drive Implementation approach discussions by taking complete ownership of partially defined problems.',
        'Practice TDD and help us retain/improve our code coverage.',
        'Optimize flows within systems for better performance in response times and memory consumption.'
      ]
    }
  ]);

  const parseExperience = (experience) => {
    const [min, max] = experience.split('-').map((x) => parseFloat(x));
    return { min, max };
  };

  const parseSalary = (salary) => {
    const [min, max] = salary.split('-').map((x) => parseFloat(x));
    return { min, max };
  };

  const getSalaryRange = (range) => {
    switch (range) {
      case '1 - 5 LPA':
        return { min: 1, max: 5 };
      case '6 - 10 LPA':
        return { min: 6, max: 10 };
      case '11 - 15 LPA':
        return { min: 11, max: 15 };
      case '16 - 20 LPA':
        return { min: 16, max: 20 };
      case '21 - 25 LPA':
        return { min: 21, max: 25 };
      case '26 - 30 LPA':
        return { min: 26, max: 30 };
      case '> 30 LPA':
        return { min: 31, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const jobExp = parseExperience(job.experience);
    const jobSalary = parseSalary(job.salary);
    const minExperience = parseInt(filters.experience) || 0;
    const minSalary = parseInt(filters.salaryFrom) || 0;
    const filterSalaryRange = getSalaryRange(filters.salary);

    const experienceMatch =
      filters.experience === "" ||
      (jobExp.min >= minExperience || jobExp.max >= minExperience);

    const salaryMatch =
      filters.salaryFrom === "" ||
      jobSalary.max >= minSalary;
      
    const salaryRangeMatch = 
      filters.salary === "" ||
      (jobSalary.max >= filterSalaryRange.min && jobSalary.min <= filterSalaryRange.max);

    const companyMatch =
      !filters.company || (Array.isArray(filters.company) ? filters.company.includes(job.company) : filters.company === job.company);

    const keywordMatch =
      !searchFields.keyword || job.title.toLowerCase().includes(searchFields.keyword.toLowerCase());

    const locationMatch =
      !searchFields.location || job.location.toLowerCase().includes(searchFields.location.toLowerCase());

    return (
      experienceMatch &&
      salaryMatch &&
      salaryRangeMatch &&
      (!filters.workMode || filters.workMode === job.workMode) &&
      companyMatch &&
      (!filters.jobType || filters.jobType === job.jobType) &&
      keywordMatch &&
      locationMatch
    );
  });

  return (
    <div className="job-list">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
