import PropTypes from "prop-types";

export function StartMenu({ onSetCategory }) {
  function changeCategory(selection) {
    onSetCategory(selection);
  }

  StartMenu.propTypes = {
    onSetCategory: PropTypes.func.isRequired,
  };

  return (
    <select onChange={(event) => changeCategory(event.target.value)}>
      <option value="">Select a category</option>
      <option value="science">Science</option>
      <option value="history">History</option>
      <option value="sport_and_leisure">Sports and leisure</option>
      <option value="music">Music</option>
      <option value="geography">Geography</option>
    </select>
  );
}
