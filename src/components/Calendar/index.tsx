import React from 'react';
import { 
    Calendar as CustomCalendar,
    LocaleConfig,
    CalendarProps
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

import { generateInterval } from './generateInterval'
import { ptBR } from './localeConf';

import { useTheme } from 'styled-components'

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

interface MarketDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?:boolean;
        disableTouchEvent?: boolean;
    },
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;   
}


function Calendar({ markedDates, onDayPress }: CalendarProps){

    const theme = useTheme();
    return(
        <CustomCalendar
            renderArrow={(direction) => 
                <Feather
                    size={24}
                    color={ theme.colors.text}
                    name={direction == 'left' ? 'chevron-left' : 'chevron-right' } 
                />
            }
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth:0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom:10,            
            }}
            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily:theme.fonts.primary_500,
                textMonthFontFamily:theme.fonts.secondary_600,
                textDayHeaderFontSize:10,
                textMonthFontSize:20,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}
            firstDay={1}
            minDate={new Date().toString()}
            markingType="period"
            markedDates={markedDates} //Datas selecionadas 
            onDayPress={onDayPress}
        />

    )
}

export {
    Calendar,
    DayProps,
    MarketDateProps,
    CalendarProps,
    generateInterval
}