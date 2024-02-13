import { AppointmentStatusesEnum, AppointmentTypeEnum } from './enums'

export const AppointmentTypeOptions = [
  {
    label: 'Court',
    value: AppointmentTypeEnum.COURT
  },
  {
    label: 'Appearance',
    value: AppointmentTypeEnum.APPEARANCE
  },
  {
    label: 'Mandated Class',
    value: AppointmentTypeEnum.MANDATED_CLASS
  }
]

export const AppointmentStatusOptions = [
  {
    label: 'Upcoming',
    value: AppointmentStatusesEnum.UPCOMING
  },
  {
    label: 'Acknowledged',
    value: AppointmentStatusesEnum.ACKNOWLEDGED
  },
  {
    label: 'Declined',
    value: AppointmentStatusesEnum.DECLINED
  },
  {
    label: 'Appeared',
    value: AppointmentStatusesEnum.APPEARED
  },
  {
    label: 'Absent',
    value: AppointmentStatusesEnum.ABSENT
  }
]
