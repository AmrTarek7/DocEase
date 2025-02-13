export interface ExternalEntity {
  name: string;
}

export interface InternalDepartment {
  name: string;
}

export interface Attachment {
  name: string;
}

export interface Letter {
  id: number;
  date: string;
  sender: string;
  internalDepartment: string;
  status: string;
  content: string;
  attachments: Attachment[];
  type: string;
  sever: string;
}

export interface Data {
  externalEntities: ExternalEntity[];
  internalDepartments: InternalDepartment[];
  letters: Letter[];
}

// تعريف واجهة لمعايير البحث
export interface SearchCriteria {
  id: number | null;
  sender: ExternalEntity | null;
  date: string | null;
}
