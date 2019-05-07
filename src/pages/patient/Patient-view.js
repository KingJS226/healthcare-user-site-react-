import React, {Component} from "react";
import { MDBRow, MDBCardBody, MDBCol, MDBCard, MDBListGroup, MDBListGroupItem, MDBDataTable, MDBContainer } from "mdbreact";
import "../../assets/css/patienteditor.css"
import { withTranslation } from 'react-i18next';
import BaseApi from "../../api/BaseApi";
import AnamnesisApi from "../../api/AnamnesisApi";
import AnswerApi from "../../api/AnswerApi";
import {loadState} from "../../storage/storage";
import {Redirect} from 'react-router';
class PatientView extends Component{
  constructor(props) {
    super(props)
    this.state = {
      date: new Date().toDateString(),
      anamnesis: [],
      answers: [],
      isLogin: true
    };


  }

  componentWillMount() {
        const token1 = loadState('token');
        if (token1) {
            BaseApi.authToken=token1;
        } else {
            this.setState({
                isLogin: false
            })
        }

  }

  componentDidMount() {
        console.log(this.props.location.patient);

        if (this.props.location.patient) {
            const token1 = loadState('token');
            if (token1) {
                BaseApi.authToken=token1;
                AnamnesisApi.getByPatient(this.props.location.patient.id).then((res) => {
                    console.log('patient', res.data);
                   if (res.data) {
                     this.setState({
                         anamnesis: res.data
                     }, this.getAnswers);

                   }
                })
            }

        }

    }

  getAnswers() {
        let answers = [];
        AnswerApi.getByAnamnesis(this.state.anamnesis.id).then((res) => {
          if (res.data) {
            res.data.map((answer) => {
                answers.push({
                    id: answer.id,
                    type: answer.responseType,
                    question: answer.question,
                    answer: answer.responseType == 4?"image":answer.answer,
                    created_at: answer.createdAt
                })
            });

              this.setState({
                  answers: answers
              });

          }
        })
    }

  render() {
      const {t} = this.props;
      const data = {
          columns: [
              {
                  label: t('id'),
                  field: 'id',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('type'),
                  field: 'type',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('question'),
                  field: 'question',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('answer'),
                  field: 'answer',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('created-at'),
                  field: 'created_at',
                  sort: 'asc',
                  width: 100
              }
          ],
          rows: this.state.answers
      };

    if (!this.state.isLogin) {
        return <Redirect to="/"/>
    }
    return (
        <div id="profile-v2" className="mb-5">
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol lg="4" className="mb-4">
                        <MDBCard narrow>
                            <MDBCardBody className="text-center">
                                <h3 className="text-muted"><strong>{t('patient')}</strong>
                                </h3>
                                <MDBListGroup className="my-4 mx-4" >
                                    <MDBListGroupItem >{t('id')}: <strong>{this.props.location.patient.id}</strong></MDBListGroupItem>
                                    <MDBListGroupItem >{t('firstname')}: <strong>{this.props.location.patient.firstName}</strong></MDBListGroupItem>
                                    <MDBListGroupItem >{t('surname')}: <strong>{this.props.location.patient.surName}</strong></MDBListGroupItem>
                                    <MDBListGroupItem >{t('dateofbirth')}: <strong>{this.props.location.patient.birthday}</strong></MDBListGroupItem>
                                    <MDBListGroupItem >{t('gender')}: <strong>{this.props.location.patient.gender}</strong></MDBListGroupItem>
                                    <MDBListGroupItem >{t('created-at')}: <strong>{this.props.location.patient.createdAt}</strong></MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8" className="mb-r">
                        <MDBCard narrow>
                            <MDBCardBody>
                                <h1 className="font-weight-bold">{t('questionandanswer')}</h1>
                                <MDBDataTable
                                    entriesLabel={t("show-entries")}
                                    searchLabel={t("search")}
                                    infoLabel={[t("showing"), t("to"), t("of"), t("entries")]}
                                    paginationLabel={[t("previous"), t("next")]}
                                    striped
                                    hover
                                    data={data}
                                    paging={true}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
  }

}

export default withTranslation('common') (PatientView);
