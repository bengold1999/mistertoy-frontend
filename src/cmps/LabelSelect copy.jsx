import { useState, useEffect } from "react"

export function LabelSelector({ selectedLabels, labels, onLabelChange }) {
  // const [selectedLabels, setSelectedLabels] = useState([])

  // useEffect(() => {
  //   onLabelChange(selectedLabels)
  // }, [selectedLabels])

  function handleLabelChange(event) {
    const label = event.target.value
    let newSelectedLabels
    if (event.target.checked) {
      newSelectedLabels = [...selectedLabels, label]
    } else {
      newSelectedLabels = selectedLabels.filter(l => l !== label)
    }
    onLabelChange(newSelectedLabels)
  }

  return (
    <div className="label-selector input flex column ">
      {labels.map(label => (
        <div key={label}>
          <input
            type="checkbox"
            value={label}
            checked={selectedLabels.includes(label)}
            onChange={handleLabelChange}
            id={label}
          />
          <label htmlFor={`checkbox-${label}`}>{label}</label>
        </div>
      ))}
    </div>
  )
}
