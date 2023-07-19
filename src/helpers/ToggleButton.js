import Switch from '@mui/material/Switch';
import { makeStyles } from "@material-ui/core/styles";


/// toggle button component/////

export function ToggleButton({ isOn, handleToggle, txt, isLight }) {

    const style = { color: isLight ? 'black' : 'white' };

    const useStyles = makeStyles((theme) => ({
        switch_track: {
            backgroundColor: "white",
        },
    }));

    const classes = useStyles();

    return (
        <div className="toggle-container" style={style}>
            <h5 style={{ textAlign: 'end' }}>{txt.off}</h5>
            <Switch
                classes={{
                    track: classes.switch_track,
                    switchBase: classes.switch_base,
                    colorPrimary: classes.switch_primary,
                }}
                checked={isOn}
                onClick={handleToggle}
            />
            <h5>{txt.on}</h5>
        </div>
    );
}