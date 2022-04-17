import { eachDayOfInterval, format} from 'date-fns';
import { CalendarProps, DayProps, MarketDateProps} from '.';
import { getPlataformDate } from '../../utils/getPlataformDate';
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps){
  console.log(start, end);
  let intervalo: MarketDateProps = {};
  const teste = eachDayOfInterval({start: new Date(start.timestamp), end: new Date(end.timestamp)});
  console.log(teste)
}