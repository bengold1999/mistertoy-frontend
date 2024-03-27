import { useState } from "react"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function LabelSelect({ selectedLabels, onLabelChange, labels }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(selectedLabels || [])

  React.useEffect(() => {
    setPersonName(selectedLabels)
  }, [selectedLabels])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event

    const newselectedLabels = typeof value === 'string' ? value.split(',') : value
    setPersonName(newselectedLabels)
    onLabelChange(newselectedLabels)
  }

  return (
    <div>
      <FormControl  fullWidth>
        <InputLabel id="demo-multiple-chip-label"> Label </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {labels.map((label) => (
            <MenuItem
              key={label}
              value={label}
              style={getStyles(label, personName, theme)}
            >
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}