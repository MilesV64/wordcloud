import React, { useState, useRef, useEffect } from 'react';
import styles from './dropdown.module.css';

const Dropdown = ({
    selectedOption, options, selectHandler
}: {
    selectedOption: string, options: [string], selectHandler: ((_:string)=>void)
}) => {

    //Outside clicks should close the menu
    const node = useRef<HTMLInputElement>();
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {         
            // inside click
            return;
        }
        setOpen(false);
    };

    const [isOpen, setOpen] = useState(false);

    const didSelectOption = ( option: string ) => {
        setOpen(false);
        selectHandler(option);
    }

    const menu = (
        <div className={styles.menu}>
            {
                options.map( (option) => {
                    return (
                        <div className={styles.item} onClick={() => didSelectOption(option)}>
                            {option}
                        </div>
                    )
                })
            }
        </div>
    )

    return (
        <div ref={node} 
            className={styles.bar + " " + (isOpen ? styles.roundTopCorners : styles.roundAllCorners)} 
            onClick={() => setOpen(!isOpen)}>
                {selectedOption ? selectedOption : "Select a group"}
                <div>
                    {isOpen ? menu : ''}
                </div>
        </div>
    )

}

export default Dropdown;

