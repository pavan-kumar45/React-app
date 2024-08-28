import { useEffect, useState } from "react";
import Editor, { useMonaco, loader } from "@monaco-editor/react";
import { storeUserAnswerData } from "@/store/atoms/assessmentDataStore";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

export default function AssessmentAnswer(props) {
  // Editor Content
  const [availableLanguages, setAvailableLanguages] = useState(["javascript"]);
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("vs-dark");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [userAnswerData, setUserAnswerData] =
    useRecoilState(storeUserAnswerData);

  useEffect(() => {
    console.log("These are current selected checks", selectedOptions);
    console.log("These are current selected checks", selectedRadio);
  }, [selectedOptions, selectedRadio]);

  const { lang, type, option, multicheck, qNo } = props;

  const handleCheckboxChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    var newSelectedOption = null;
    var newUserAnswerData = null;
    if (
      !selectedOptions.length ||
      !selectedOptions.includes(event.target.value)
    ) {
      newSelectedOption = [...selectedOptions, event.target.value];
      newUserAnswerData = [...userAnswerData[qNo].answer, event.target.value];
    } else {
      newSelectedOption = selectedOptions.filter(
        (item) => item !== event.target.value
      );
      newUserAnswerData = userAnswerData[qNo].answer.filter(
        (item) => item !== event.target.value
      );
    }
    setSelectedOptions(newSelectedOption);
    setAnswerContent(newUserAnswerData);
  };

  const isCheckBoxChecked = (option) => {
    option = qNo + option;
    if (selectedOptions.length) {
      if (selectedOptions.includes(option)) {
        return true;
      }
      return false;
    }
    return false;
  };
  const handleRadioButtonChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    var newSelectedRadio = null;
    var newUserAnswerData = null;
    if (!selectedRadio.length || !selectedRadio.includes(event.target.value)) {
      newSelectedRadio = [...selectedRadio, event.target.value];
      newUserAnswerData = [...userAnswerData[qNo].answer, event.target.value];
    } else {
      newSelectedRadio = selectedRadio.filter(
        (item) => item !== event.target.value
      );
      newUserAnswerData = userAnswerData[qNo].answer.filter(
        (item) => item !== event.target.value
      );
    }
    setSelectedRadio(newSelectedRadio);
    setAnswerContent(newUserAnswerData);
  };

  const isRadioButtonSelected = (option) => {
    option = qNo + option;
    if (selectedRadio.length) {
      if (selectedRadio.includes(option)) {
        return true;
      }
      return false;
    }
    return false;
  };

  // Question Content

  const MultiCheckComponent = (multiCheckOptions) => {
    return (
      <div className="answer-multicontent">
        {console.log("These are checkboxes", multiCheckOptions)}
        {multiCheckOptions.multiCheckOptions.map((option) => (
          <label key={option} className="checkbox-label">
            <input
              type="checkbox"
              value={qNo + option}
              checked={isCheckBoxChecked(option)}
              onChange={handleCheckboxChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };

  const MultiChoiceComponent = (multiChoiceOptions) => {
    return (
      <div className="answer-multicontent">
        {console.log("These are radios", multiChoiceOptions)}
        {multiChoiceOptions.multiChoiceOptions.map((option) => (
          <label key={option} className="checkbox-label">
            <input
              type="radio"
              value={qNo + option}
              checked={isRadioButtonSelected(option)}
              onChange={handleRadioButtonChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  };

  const EditorSettings = () => {
    return (
      <div className="settings">
        {console.log(availableLanguages)}
        <select
          name="theme"
          id=""
          className="theme-select"
          onChange={handleThemeSelect}
          defaultValue="disabled"
        >
          <option value="disabled" disabled>
            Set Theme
          </option>
          <option value="light">Light</option>
          <option value="vs-dark">Dark</option>
        </select>

        <select
          name=""
          id=""
          className="language-select"
          onChange={handleLanguageSelect}
          defaultValue="disabled"
        >
          <option value="disabled" disabled>
            Set Language
          </option>
          {availableLanguages?.map((lang, index) => (
            <option value={lang} key={index}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    console.log("These are available languages : ", lang);
    setAvailableLanguages(lang);
    console.log("This is user Data", userAnswerData);
  });

  const options = {
    quickSuggestions: false,
  };

  function handleThemeSelect(event) {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  }
  function handleLanguageSelect(event) {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);
    setLanguage(selectedLanguage);
  }

  const changeDefaultAnswerSectionContent = () => {
    // console.log("This is user answer data", userAnswerData[qNo].answer);
    if (userAnswerData[qNo]) {
      if (userAnswerData[qNo].answer == null) {
        return "// Type your code here";
      } else {
        return userAnswerData[qNo].answer;
      }
    }
  };

  const setAnswerContent = (value) => {
    console.log("Check this", qNo, value);
    setUserAnswerData((prevUserAnswers) => {
      const newAnswerArray = [...prevUserAnswers];
      newAnswerArray[qNo] = { ...newAnswerArray[qNo], answer: value };
      return newAnswerArray;
    });
  };


  return (
    <motion.div
    key={qNo}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.7 }}
  >
    <div className="assessment-answercontent">
      {console.log("This is questionNo ", qNo)}
      {type == "code" || type == "Text" ? (
        <>
          <EditorSettings />
          <Editor
            height="90vh"
            theme={theme}
            defaultValue="// Type your code here"
            defaultLanguage=""
            value={changeDefaultAnswerSectionContent()}
            onChange={setAnswerContent}
            options={options}
            language={language}
          />
        </>
      ) : type == "MCQ" ? (
        multicheck == true ? (
          <MultiCheckComponent multiCheckOptions={option} />
        ) : (
          <MultiChoiceComponent multiChoiceOptions={option} />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </motion.div>
  );
}
