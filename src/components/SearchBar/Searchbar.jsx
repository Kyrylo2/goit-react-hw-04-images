import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

import searchIcon from '../../resources/search_icon.svg';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleStateChange = e => {
    setInput(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    console.log('Шукаю фотки');
    e.preventDefault();

    if (input.trim() === '') {
      return toast.warn('Please enter a valid input');
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton
          type="submit"
          style={{ backgroundImage: `url(${searchIcon})` }}
        >
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          value={input}
          placeholder="Search images and photos"
          onChange={handleStateChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}
