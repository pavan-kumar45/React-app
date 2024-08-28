"use client";

import AssessmentHeader from "@/components/authComponents/AssessmentHeader";
import "./assessmentStyle.css";
import AssessmentQuestion from "@/components/authComponents/AssessmentQuestion";
import AssessmentAnswer from "@/components/authComponents/AssessmentAnswer";
import { useEffect, useState } from "react";
import {
  storeQuestionOnBoard,
  storeUserAnswerData,
} from "@/store/atoms/assessmentDataStore";
import AssessmentOperation from "@/components/authComponents/AssessmentOperation";
import QuestionsModal from "@/components/authComponents/QuestionsModal";
import { storeQuestionData } from "@/store/atoms/assessmentDataStore";
import { useRecoilState } from "recoil";
import Loading from "../../loading";
import { FaQuestion } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function assessment() {
  const [questionsData, setQuestionsData] = useRecoilState(storeQuestionData);
  const [questionOnBoard, setQuestionOnBoard] =
    useRecoilState(storeQuestionOnBoard);
  const [userAnswerData, setUserAnswerData] =
    useRecoilState(storeUserAnswerData);
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const previousQuestionDisplay = () => {
    console.log("Next question button is pressed");
    if (!(questionOnBoard.qno == 0)) {
      const questionNo = parseInt(questionOnBoard.qno, 10) - 1;
      // console.log(questionsD)
      defaultQuestionToDisplay(questionNo, questionsData[questionNo]);
      console.log(questionOnBoard.qno, ",", questionsData.length);
    }
  };

  const nextQuestionDisplay = () => {
    console.log("Next question button is pressed");
    if (!(questionOnBoard.qno == questionsData.length - 1)) {
      const questionNo = parseInt(questionOnBoard.qno, 10) + 1;
      // console.log(questionsD)
      defaultQuestionToDisplay(questionNo, questionsData[questionNo]);
      console.log(questionOnBoard.qno, ",", questionsData.length);
      // setDefaultAnswerContent(questionOnBoard.qno)
    }
  };

  const handleReviewButton = () => {
    var index = parseInt(questionOnBoard.qno);
    console.log(
      "Review button is clicked for the question",
      questionOnBoard.qno,
      userAnswerData[index]
    );
    const newUserData = [...userAnswerData];
    newUserData[index] = {
      ...newUserData[index],
      review: !newUserData[index].review,
    };
    setUserAnswerData(newUserData);
  };

  const defaultQuestionToDisplay = (
    defaultQuestionNumber,
    defaultQuestionData
  ) => {
    console.log("This is current Question No : ", defaultQuestionNumber);
    console.log("This is current question : ", defaultQuestionData);
    setQuestionOnBoard(defaultQuestionData);
  };

  const setAssessmentModalQuestions = () => {};

  const setAnswerDataModel = () => {
    console.log("hey", userAnswerData);
    questionsData.map((question) => {
      const answerData = {
        qno: question.qno,
        qid: question.id,
        review: false,
        answer: null,
      };
      const answerArrayData = {
        qno: question.qno,
        qid: question.id,
        review: false,
        answer: [],
      };
      if (question.qtype === "code" || question.qtype === "Text") {
        setUserAnswerData((oldObject) =>
          typeof oldObject[0] === "object"
            ? [...oldObject, answerData]
            : [answerData]
        );
      } else {
        setUserAnswerData((oldObject) =>
          typeof oldObject[0] === "object"
            ? [...oldObject, answerArrayData]
            : [answerArrayData]
        );
      }

      console.log("This is answer Data", answerData);
    });
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  useEffect(() => {
    if (questionsData) {
      setAnswerDataModel();
      setAssessmentModalQuestions();
    }
  }, [questionsData]);

  useEffect(() => {
    function fetchData() {
      fetch("/data/AssessmentQuestions.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("This is data", data);
          setQuestionsData(data);
          defaultQuestionToDisplay(0, data[0]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    fetchData();
  }, []);


  return (
    <>
      {questionsData && questionOnBoard && userAnswerData ? (
        <div className="assessment-maincontent">
          <AssessmentHeader />
          
          <div className="assessment-usercontent">
            <div className="question">
              <AssessmentQuestion question={questionOnBoard} id="assessment-question"/>
            </div>
            <div className="answer">
              <AssessmentAnswer
                lang={questionOnBoard.qlanguage}
                type={questionOnBoard.qtype}
                option={questionOnBoard.qoptions}
                multicheck={questionOnBoard.qmulticheck}
                qNo={parseInt(questionOnBoard.qno)}
              />
            </div>
          </div>
          <AssessmentOperation
            previousQuestionDisplay={previousQuestionDisplay}
            nextQuestionDisplay={nextQuestionDisplay}
            questionNo={questionOnBoard.qno}
            questionLength={questionsData.length}
            markedForReview={
              userAnswerData[parseInt(questionOnBoard.qno)]
                ? userAnswerData[parseInt(questionOnBoard.qno)].review
                : 0
            }
            handleReviewButton={handleReviewButton}
            handleModalVisibility={handleModalVisibility}
            anchor = "assessment-question"
          />
          <QuestionsModal
            modalVisibility={modalVisibility}
            handleModalVisibility={handleModalVisibility}
            defaultQuestionToDisplay={defaultQuestionToDisplay}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
