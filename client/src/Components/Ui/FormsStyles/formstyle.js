import styled from 'styled-components';

export const StyledForm = styled.section`
  display: grid;
  align-content: center;
  justify-content: center;
  /* height: 90vh; */
  margin: ${props => props.marginForm || '10em 0'};
  flex-wrap: wrap;

  .form {
    align-self: center;
    width: 100%;
    max-width: 600px;

    label {
      font-family: var(--primary--fn);
      font-weight: bold;
      font-size: 1.1rem;
      color: var(--text--clr);
    }
  }

  .banner {
    /* flex: 100%; */
    text-align: center;
    &--title {
      padding-bottom: 0.5em;

      &::after {
        background-color: var(--third--clr);
      }
    }
    &--subtitle {
      color: var(--text--clr);
    }
  }
`;
