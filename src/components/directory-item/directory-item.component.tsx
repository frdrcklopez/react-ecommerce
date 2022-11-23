import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DirectoryBody,
  BackgroundImage,
  DirectoryItemContainer,
} from './directory-item.styles'

import { DirectoryCategory } from '../directory/directory.component';

type CategoryProps = {
  category : DirectoryCategory
}

const DirectoryItem: FC<CategoryProps> = ({ category }) => {
    const { imageUrl, title, route } = category
    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(route)

    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage 
            imageUrl={imageUrl}
          />
          <DirectoryBody>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </DirectoryBody>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem