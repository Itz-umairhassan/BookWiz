import React, { useState, useContext, useRef, useEffect } from 'react'

import { Dropdown, DropdownItem, Badge, Button } from '@windmill/react-ui'

import UpdateFolderModal from '../Modals/UpdateFolderModal'


function DropdownExample({ _Folder, FolderDeleteCallBack, FolderUpdateCallBack, }) {
    const [isOpen, setIsOpen] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal(newFolder) {
        setIsModalOpen(false)
    }







    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleClick(e) {
        e.stopPropagation()
        setIsMenuOpen(!isMenuOpen);

    }
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };
    console.log(_Folder);
    //   useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //       document.removeEventListener('mousedown', handleClickOutside);
    //     };
    //   }, []);

    const handleUpdate = (folder) => {
        //FolderUpdateCallBack(folder);
        e.stopPropagation()
        setDropdownOpen(false);
    };

    const handleDelete = (folderId) => {
        e.stopPropagation()
        FolderDeleteCallBack(folderId);
        setDropdownOpen(false);
    };

    const handleDropDownBodyClick = (e) => {
        e.stopPropagation()
    }

    return (

        <>
            <div style={{ display: 'flex', alignItems: 'center' }} ref={ref}>
                <button

                    onClick={handleClick}

                >
                    ...
                </button>
                <Dropdown align="left" isOpen={isMenuOpen} handleDropDownBodyClick style={{ width: '20px', height: '100px' }} >
                    <DropdownItem tag="a" href="#" onClick={(e) => {
                        e.stopPropagation();
                        openModal();
                    }}
                        className="justify-between">

                        <span >Edit</span>
                        <UpdateFolderModal _Folder={_Folder} isModelOpen={isModalOpen} closeModal={closeModal} FolderUpdateCallBack={FolderUpdateCallBack} />
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={(e) => {
                        e.stopPropagation();
                        FolderDeleteCallBack(_Folder._id);
                    }}
                        className="justify-between">

                        <span>Delete
                        </span>
                    </DropdownItem>

                </Dropdown>
            </div>

        </>
    )
}
export default DropdownExample




