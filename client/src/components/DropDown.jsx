import React, { useState, useRef, useEffect } from 'react'

import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'



function DropdownExample({ fileId, handleChatNavigation, onDelete}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null);
//   function toggleDropdown() {
//     setIsOpen(!isOpen)
//   }
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <span onClick={() => setIsOpen(!isOpen)}  style={{  cursor: 'pointer' }} aria-label="Notifications" aria-haspopup="true">
        ...
      </span>
      <div >
      <Dropdown isOpen={isOpen} style={{ width: '60px' }}>
        <DropdownItem tag="a" href="#" className="justify-between"  onClick={() => handleChatNavigation(fileId)}>
          <span>Chat</span>
        </DropdownItem>
        <DropdownItem onClick={() => onDelete(fileId)}>
          <span>Delete</span>
        </DropdownItem>
        {/* onClick={() => onView(fileId)} */}
        <DropdownItem >
          <span>View</span>
        </DropdownItem>
      </Dropdown>
    </div>
    </div>
  )
}
export default DropdownExample