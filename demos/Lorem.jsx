import React from 'react';
import presets from '../src/presets';
/* eslint-disable */
const lorems = `Lorem ipsum dolor sit amet, hinc wisi facilisis sit ea. Eam prima nostro eu, dicit tritani ea vis. In propriae signiferumque vim. Nostro accusata sed no, iisque scripserit te ius. His utamur incorrupte te. Ceteros euripidis consectetuer mea ad, id mea adhuc ludus voluptatibus.
Exerci mollis delicata eum no, cum id commodo interpretaris. Ad soleat pertinacia mea. Nihil nominavi complectitur id sea. Vis docendi ponderum cu, vocent accommodare consequuntur duo et, alienum sapientem adversarium his te. Ius in nonumy reformidans.
Moderatius dissentiet nec ne. Usu no stet voluptatum moderatius, sed magna utinam an, in has dolore latine indoctum. Malorum eloquentiam ex quo, te cetero signiferumque nec. Ei usu populo labores urbanitas, usu et dico idque conclusionemque, vivendum persequeris disputationi nam eu.
At vis persequeris mediocritatem, quas omnes tantas in nam, iuvaret officiis te vel. Velit munere per an, graece malorum repudiare mei id, everti repudiare ei eum. Eum id nibh dignissim. At sed tota tation adversarium, in veniam vivendum dissentiunt vim. Pro ad discere nominati disputando.
Populo mentitum has et, nobis populo et nam. Minimum erroribus prodesset ad qui. Eum utroque mediocrem ut, ut placerat inimicus deseruisse eam. Ubique consulatu et per, hinc agam tollit mel an. Per quem omnesque lucilius in, mei dicta ancillae ei. Pro te summo hendrerit.`.split('\n');
/* eslint-enable */

let count = 0;


function LoremCreator(sceneConfig) {
  const Lorem = React.createClass({
    getInitialState() {
      return {
        lorem: lorems[count++ % lorems.length]
      };
    },

    render() {
      return (
        <div className="lorem" style={this.props.style}>
          <h1>{count}.</h1>
          <p>{this.state.lorem}</p>
          <p>{this.state.lorem.split(' ').reverse().join(' ')}</p>
        </div>
      );
    }
  });
  Lorem.sceneConfig = sceneConfig;
  return Lorem;
}

export const FadeLorem = LoremCreator(presets.fade);
export const PopLorem = LoremCreator(presets.pop);
export const SlideLeftLorem = LoremCreator(presets.slideLeft);
export const SlideRighLorem = LoremCreator(presets.slideRight);
export const Lorem = LoremCreator(null); // don't override default