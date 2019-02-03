import React from 'react';

import classNames from 'classnames/bind';
import styles from './CommonQuestion.scss';

import SectionTitle from '../../common/SectionTitle';
import { SubsectionHeader } from '../../common';
import AnswerArea from '../AnswerArea';
const cx = classNames.bind(styles);

const CommonQuestion = ({ questions, answers, onInputChange }) => {

  return (
    <>
      <SectionTitle title='공통 질문 (BASIC QUESTIONS)' />
      {questions.map((question, index) => (
        <div key={index} className={cx('answer-form')}>
          <SubsectionHeader title={`Q. ${question}`} />
          <AnswerArea 
            type={'common'}
            name={null}
            index={index}
            answer={answers[index]}
            onInputChange={onInputChange}
          />
        </div>
      ))}
    </>
  )
};

export default CommonQuestion;