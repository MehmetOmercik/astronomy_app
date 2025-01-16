import { FC, ReactNode } from 'react'

import { CiCircleInfo } from "react-icons/ci";
import { Tooltip as ReactTooltip} from 'react-tooltip';

interface TooltipProps {
    id: number,
    message: string | ReactNode
}


export const Tooltip: FC<TooltipProps> = ({id, message}) => {
    const tooltipID = `tooltip-id-${id}`

    // TODO Its bad practice to keep recreating ReactTooltip: https://react-tooltip.com/docs/troubleshooting#dynamically-generated-anchor-element.
    // Look into the link if you can find an alternative
    return (
        <span>
            <CiCircleInfo 
                size={25} 
                id={tooltipID}
            />

            <ReactTooltip
                className='max-w-[15rem] sm:max-w-[20rem] z-[90]'
                anchorSelect={`#${tooltipID}`}
                place='top'
            >
                {message}
            </ReactTooltip>
        </span>
    )
}