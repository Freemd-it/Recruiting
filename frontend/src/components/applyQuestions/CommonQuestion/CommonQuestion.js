import React from 'react';

import classNames from 'classnames/bind';
import styles from './CommonQuestion.scss';

import SectionTitle from '../../common/SectionTitle';
import { SubsectionHeader } from '../../common';
import AnswerArea from '../AnswerArea';
const cx = classNames.bind(styles);

const CommonQuestion = ({ commonQuestions, answers, onInputChange }) => {

  return (
    <>
      <SectionTitle title="공통 질문 (BASIC QUESTIONS)" />
      {commonQuestions.map((question, index) => (
        <div key={index} className={cx('answer-form')}>
          <SubsectionHeader title={question} />
          <AnswerArea 
            type={'common'}
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