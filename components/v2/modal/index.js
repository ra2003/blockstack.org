import React, { useState, useContext } from 'react'
import { Button } from '@components/button'
import { Box, Flex } from 'blockstack-ui'
import { transition } from '@common/theme'
import ReactPlayer from 'react-player'
import CloseIcon from 'mdi-react/CloseIcon'
import { useLockBodyScroll } from 'react-use'
export const ModalContext = React.createContext()

export const ModalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    src: null,
    open: false
  })
  const handleClose = () =>
    setState({
      src: null,
      open: false
    })
  const handleOpen = (src) =>
    setState({
      src,
      open: true
    })

  return (
    <ModalContext.Provider value={{ ...state, handleClose, handleOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

const Modal = ({ ...rest }) => {
  const { src, open, handleClose } = useContext(ModalContext)
  useLockBodyScroll(open)
  return (
    <Flex
      flexDirection="column"
      position="fixed"
      width="100%"
      height="100vh"
      top={0}
      left={0}
      bg="rgba(0,0,0,0.8)"
      zIndex={99999999999}
      p={[5, 5, 8]}
      opacity={open ? 1 : 0}
      transition={transition}
      style={{
        pointerEvents: open ? 'unset' : 'none'
      }}
      {...rest}
    >
      {' '}
      <Flex pb={2} justifyContent="flex-end">
        <Box onClick={handleClose}>
          <CloseIcon size={32} color="white" />
        </Box>
      </Flex>
      <Flex
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        width={1}
        maxHeight="100%"
      >
        <Box width={1} position="relative">
          <Box width={1} height={'0px'} pb="56.25%" />
          <Box position="absolute" top={0} size="100%">
            {src ? (
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                playsinline
                url={src}
              />
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

export { Modal }