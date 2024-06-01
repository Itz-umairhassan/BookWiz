import React, { useState,useContext, useRef, useEffect } from 'react'

import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'




function DropdownExample({ fileId, handleChatNavigation, onDelete}) {
  const [isOpen, setIsOpen] = useState(false)
  
const [isMenuOpen, setIsMenuOpen] = useState(false);
function handleClick() {
  setIsMenuOpen(!isMenuOpen);
}
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (

    <>
     <div style={{ position: 'relative', width: '60px' }} ref={ref}>
          <button
            // className="rounded-full focus:shadow-outline-purple focus:outline-none"
            onClick={handleClick}
            // aria-label="Account"
            // style={{ background: 'aqua' }}
            // aria-haspopup="true"
          >
            ...
          </button> 
 <Dropdown align="right" isOpen={isMenuOpen} style={{ position: 'absolute', top: '0', right: '-100%', width: '100%' }}>
            <DropdownItem tag="a" href="#" onClick={() => handleChatNavigation(fileId)}>
             
              <span>Chat</span>
            </DropdownItem>
            <DropdownItem tag="a" href="#" onClick={() => onDelete(fileId)}>
              {/* <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" /> */}
              <span>Delete</span>
            </DropdownItem>
            <DropdownItem >
              {/* <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" /> */}
              <span>View</span>
            </DropdownItem>
          </Dropdown>
          </div>
        
    </>
  )
}
export default DropdownExample


    
         
