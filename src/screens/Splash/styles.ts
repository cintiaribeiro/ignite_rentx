import styled from 'styled-components/native';
import { getStatusBarHeight,getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

 
export const Container = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.shape_dark};
`;