import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone';

import {Preset} from './HomePage'


function imageValidator(file: {type: string}) {
    if (!file.type.includes('image')) {
        return {
            code: 'not-image',
            message: 'File must be a valid image'
        }
    }
    return null
}

export default function PresetCard({ data }: { data: Preset }) {
    
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({validator: imageValidator});



    console.log(acceptedFiles);
    return (
        <Box w='200px' h='250px' bg='green.400' borderRadius='md' p='2'>
            <Heading as='h3' size='md'>                
                {data.name}            
            </Heading>
            <div {...getRootProps()} style={{border: '2px dashed #C6F6D5', height: '200px'}}>
                <input {...getInputProps()} />
                <p>Drag files here</p>
            </div>
            
        </Box>
    )
}
