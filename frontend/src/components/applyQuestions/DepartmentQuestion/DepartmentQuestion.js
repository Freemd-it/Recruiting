import React from 'react';

import classNames from 'classnames/bind';
import styles from './DepartmentQuestion.scss';
import { SectionTitle, SubsectionHeader } from '../../common';
import AnswerArea from '../AnswerArea';
import FileUploadForm from '../FileUploadForm';
import TechSelectForm from '../TechSelectForm';

const cx = classNames.bind(styles);

const DepartmentQuestion = ({ questionModules, answers, onInputChange }) => {

  const answerFormByType = (answerType, index, name, answer, onInputChange) => {
    switch (answerType) {
      case 'text':
        return (
          <AnswerArea
            type={'department'}
            index={index}
            name={name}
            answer={answer ? answer.text : ''}
            onInputChange={onInputChange}
          />

        )
      case 'file':
        return (
          <>
            <AnswerArea
              type={'department'}
              index={index}
              name={name}
              answer={answer ? answer.text : ''}
              onInputChange={onInputChange}
            />
            <FileUploadForm
              type={'department'}
              index={index}
              name={name}
              answer={answer ? answer.file : null}
              onInputChange={onInputChange}
            />
          </>
        )
      case 'select':
        return (
          <>
            <TechSelectForm
              type={'department'}
              index={index}
              name={name}
              answer={answer ? answer.select : null}
              onInputChange={onInputChange}
            />
            <AnswerArea
              type={'department'}
              index={index}
              name={name}
              answer={answer ? answer.text : ''}
              onInputChange={onInputChange}
            />
          </>
        )
    }
  }

  const componentByModule = (questionModule, index) => (
    <div key={index} className={cx('department-question-form')}>
      <div className={cx('department-title')}>
        {questionModule.rank}지망: {questionModule.name}
      </div>
      <div>
        {questionModule.questions.map(({ question, answerType }, questionIndex) => (
          <div key={`${index}__${questionIndex}`} className={cx('department-answer-form')}>
            <SubsectionHeader title={`Q. ${question}`} />
            {answerFormByType(
              answerType,
              questionIndex,
              questionModule.name,
              answers[questionModule.name] ? answers[questionModule.name][questionIndex] : '',
              onInputChange)}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <SectionTitle title='모집 단위별 질문' />
      <div>
        {questionModules.map((questionModule, index) => componentByModule(questionModule, index))}
      </div>
    </>
  )
}

export default DepartmentQuestion;
