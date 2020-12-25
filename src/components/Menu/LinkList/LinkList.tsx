/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import LinkItem from './LinkItem/LinkItem';
import classes from './LinkList.module.css';
import { GenresContext } from '../../../context/genres';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

interface Props {
  onclick: () => void
}

const LinkList: React.FC<Props> = (props) => {

  const { onclick } = props

  const links = useContext(GenresContext);
  let content: React.ReactNode = <ErrorMessage message="Can't load the Categories" />;

  if (links) {
    if (Object.keys(links).length > 3) {
      content = Object.keys(links).map((key) => (
        <LinkItem key={key} to={key} text={links[key].text} />
      ));
    } else {
      content = <Spinner />;
    }
  }

  return (
    <ul className={classes.LinkList} onClick={onclick}>
      {content}
    </ul>
  );
};

export default LinkList;