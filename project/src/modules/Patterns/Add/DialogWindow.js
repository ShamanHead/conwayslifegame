import Dialog from "../../Dialog";
import CanvasMenu from '../../CanvasMenu'
import TagFilter from './TagFilter'

export default function DialogWindow (props) 
{

    return (
        <Dialog state={props.dialog} close={props.closeDialog}>
            <h2 className="dialog-window__title">New Pattern</h2>
            <CanvasMenu 
                menuIcons={["clear"]} 
                width="720"
                height="500"
                type="fixed"
                size={{width: 12, height: 12}}
                borderOnSet={true}
                showGeneration={false}
            />
            html
            <input type="" placeholder="Name" class="pattern-dialog-input mt-5 mb-5" />
            <TagFilter/>
        </Dialog>
    )

}
