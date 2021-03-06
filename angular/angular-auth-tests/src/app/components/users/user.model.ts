/**
 *
 */
import { Observable, from } from 'rxjs'
import { map, reduce } from 'rxjs/operators'
import { Pipe, PipeTransform } from '@angular/core'

/**
 * User roles.
 */
export enum UserRole {
  Basic = 0,
  Viewer = 1,
  Admin = 2,
  SuperUser = 3
}

/**
 * String translations of roles
 */
const userRoleNames = ['Basic', 'Viewer', 'Admin', 'SuperUser']

/**
 * String translation, translates nr to rolename.
 */
@Pipe({ name: 'asRole' })
export class UserRoleNamePipe implements PipeTransform {
  transform(roleNr: number) {
    return userRoleNames[roleNr]
  }
}

export enum Gender {
  'male' = 0,
  'female',
  'unknown'
}

export enum Title {
  'mr.',
  'ms',
  'miss',
  'mrs',
  'monsieur',
  'madame',
  'mademoiselle',
  'unknown'
}

export class User {
  id: string
  gender: Gender = Gender.unknown
  name: {
    title: Title
    firstname: string
    lastname: string
  } = {
    title: Title.unknown,
    firstname: '',
    lastname: ''
  }
  location: {
    street: { number: string; name: string }
    city: string
    state: string
    postcode: number
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email = ''
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: Date
    age: number
  }
  registered: {
    date: Date
    age: number
  }
  phone: string
  cell: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  } = {
    large: './assets/images/anonymous-person.png',
    medium: './assets/images/anonymous-person.png',
    thumbnail: './assets/images/anonymous-person.png'
  }
  // nationality
  nat: string
  // Authentication roles
  roles: UserRole[] = [UserRole.Basic]

  constructor(values: any = {}) {
    // Assign all values to this objects properties
    Object.assign(this, values)
    // In our case, the server returns a different set of name properties.
    // Here we map them to our properties.
    if (values.name && values.name.first) {
      this.name.firstname = values.name.first
    }
    if (values.name && values.name.last) {
      this.name.lastname = values.name.last
    }
    if (values._id) {
      this.id = values._id
    }
  }

  /**
   * Checks whether this user has the given role. Used in authenticated routes.
   *
   * @param rolename UserRole
   */
  public hasRole(rolename: UserRole): Observable<boolean> {
    return from(this.roles).pipe(
      map(val => val === rolename),
      reduce((a, b) => a || b)
    )
  }

  // Get the user's fullname.
  get fullName() {
    console.log('return', this.name.firstname + ' ' + this.name.lastname)
    return this.name.firstname + ' ' + this.name.lastname
  }
}
