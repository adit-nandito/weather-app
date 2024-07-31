import listCities from "../../config/listCities.json";
import './style.css';

const SelectBox = (props) => {
  const { selectedCity, handleChangeCity } = props;
  return (
  <div style={{ marginBottom: "20px" }}>
    <span>Select City: </span>
    <select className="customSelect" value={selectedCity} onChange={handleChangeCity}>
      {listCities.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>);
};

export default SelectBox;
