import MultiRangeSlider from "./multiRangeSlider";
import "./styles.css";
import React, { useCallback, useEffect, useState, useRef } from "react";

const SlidersDynamic = ({ sliders, setSliders }) => {
  return (
    <>
      {sliders.map((slider, index) => {
        const prevSlider = index > 0 ? sliders[index - 1] : null;
        const nextSlider = index < sliders.length ? sliders[index + 1] : null;
        return (
          <MultiRangeSlider
            key={slider.color}
            min={0}
            max={100}
            minDefault={slider.min}
            maxDefault={slider.max}
            color={slider.color}
            prevMax={prevSlider ? prevSlider.max : null}
            nextMin={nextSlider ? nextSlider.min : null}
            onChange={({ min, max }) => {
              slider.min = min;
              slider.max = max;

              const newSlider = sliders.map((item, mapIndex) => {
                if (mapIndex !== index) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                  ...item,
                  min,
                  max
                };
              });
              debugger;
              if (slider.min !== min) {
                //setSliders(newSlider);
              }
            }}
          />
        );
      })}
    </>
  );
};

const Sliders = ({ sliders }) => {
  const [firstMin, setFirstMin] = useState(0);
  const [firstMax, setFirstMax] = useState(10);
  const [secondMin, setSecondMin] = useState(50);
  const [secondMax, setSecondMax] = useState(60);
  const [thirdMin, setThirdMin] = useState(50);
  const [thirdMax, setThirdMax] = useState(60);
  return (
    <>
      <MultiRangeSlider
        min={0}
        max={100}
        minDefault={10}
        maxDefault={20}
        color="blue"
        nextMin={secondMin}
        onChange={({ min, max }) => {
          setFirstMin(min);
          setFirstMax(max);
        }}
      />
      <MultiRangeSlider
        min={0}
        max={100}
        minDefault={50}
        maxDefault={60}
        color="red"
        labelTop={20}
        prevMax={firstMax}
        nextMin={thirdMin}
        onChange={({ min, max }) => {
          setSecondMin(min);
          setSecondMax(max);
        }}
      />
      <MultiRangeSlider
        min={0}
        max={100}
        minDefault={70}
        maxDefault={90}
        color="yellow"
        labelTop={40}
        prevMax={secondMax}
        onChange={({ min, max }) => {
          setThirdMin(min);
          setThirdMax(max);
        }}
      />
    </>
  );
};

const App = () => {
  const [sliders, setSliders] = useState([
    {
      min: 10,
      max: 40,
      color: "blue"
    },
    {
      min: 50,
      max: 80,
      color: "red"
    },
    {
      min: 85,
      max: 90,
      color: "yellow"
    }
  ]);
  return (
    <>
      <div style={{ color: "white" }}>{JSON.stringify(sliders)}</div>
      <SlidersDynamic sliders={sliders} setSliders={setSliders} />
    </>
  );
};

export default App;
